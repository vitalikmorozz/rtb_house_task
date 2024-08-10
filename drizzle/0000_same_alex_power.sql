DO $$ BEGIN
 CREATE TYPE "public"."page" AS ENUM('home', 'dashboard');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rtb_house_task_pageVisits" (
	"uid" uuid,
	"number_of_visits" integer,
	"page" "page"
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rtb_house_task_user_info" (
	"uid" uuid PRIMARY KEY NOT NULL,
	"first_name" varchar(256),
	"last_name" varchar(256),
	"avatar" varchar(256),
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rtb_house_task_pageVisits" ADD CONSTRAINT "rtb_house_task_pageVisits_uid_rtb_house_task_user_info_uid_fk" FOREIGN KEY ("uid") REFERENCES "public"."rtb_house_task_user_info"("uid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
