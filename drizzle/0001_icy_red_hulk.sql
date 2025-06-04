PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_posts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`description` text,
	`author_id` text NOT NULL,
	`author_full_name` text NOT NULL,
	`published` integer DEFAULT false,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_posts`("id", "title", "content", "description", "author_id", "author_full_name", "published", "created_at", "updated_at") SELECT "id", "title", "content", "description", "author_id", "author_full_name", "published", "created_at", "updated_at" FROM `posts`;--> statement-breakpoint
DROP TABLE `posts`;--> statement-breakpoint
ALTER TABLE `__new_posts` RENAME TO `posts`;--> statement-breakpoint
PRAGMA foreign_keys=ON;