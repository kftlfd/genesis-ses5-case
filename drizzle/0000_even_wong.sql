CREATE TYPE "public"."frequency" AS ENUM('daily', 'hourly');--> statement-breakpoint
CREATE TABLE "gses5_subscriptions" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"city" varchar(255) NOT NULL,
	"frequency" "frequency" NOT NULL,
	"confirmed" boolean DEFAULT false NOT NULL,
	"confirmToken" varchar(255) NOT NULL,
	"unsubToken" varchar(255) NOT NULL,
	CONSTRAINT "gses5_subscriptions_email_unique" UNIQUE("email")
);
