DO $$ BEGIN
 CREATE TYPE "public"."itemType" AS ENUM('image');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."page" AS ENUM('home', 'dashboard');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rtb_house_task_itemViews" (
	"uid" uuid NOT NULL,
	"views" integer DEFAULT 0 NOT NULL,
	"item_id" varchar(256) NOT NULL,
	"type" "itemType" NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone,
	CONSTRAINT "rtb_house_task_itemViews_uid_item_id_pk" PRIMARY KEY("uid","item_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rtb_house_task_pageVisits" (
	"uid" uuid NOT NULL,
	"number_of_visits" integer DEFAULT 0 NOT NULL,
	"page" "page" NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone,
	CONSTRAINT "rtb_house_task_pageVisits_uid_page_pk" PRIMARY KEY("uid","page")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rtb_house_task_user" (
	"uid" uuid PRIMARY KEY NOT NULL,
	"first_name" varchar(256) NOT NULL,
	"last_name" varchar(256) NOT NULL,
	"avatar" varchar(256) NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rtb_house_task_itemViews" ADD CONSTRAINT "rtb_house_task_itemViews_uid_rtb_house_task_user_uid_fk" FOREIGN KEY ("uid") REFERENCES "public"."rtb_house_task_user"("uid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rtb_house_task_pageVisits" ADD CONSTRAINT "rtb_house_task_pageVisits_uid_rtb_house_task_user_uid_fk" FOREIGN KEY ("uid") REFERENCES "public"."rtb_house_task_user"("uid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
