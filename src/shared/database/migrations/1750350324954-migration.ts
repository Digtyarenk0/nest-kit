import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1750350324954 implements MigrationInterface {
  name = 'Migration1750350324954';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "users" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "email" character varying NOT NULL,
                "password" character varying NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."projects_status_enum" AS ENUM('quenue', 'parsing', 'failed', 'parsed')
        `);
    await queryRunner.query(`
            CREATE TABLE "projects" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying,
                "status" "public"."projects_status_enum" NOT NULL DEFAULT 'quenue',
                "url" character varying NOT NULL,
                "stars" integer DEFAULT '0',
                "forks" integer DEFAULT '0',
                "openIssues" integer DEFAULT '0',
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "repOwner" character varying DEFAULT '',
                "error" character varying DEFAULT '',
                "ownerId" uuid,
                CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id")
            );
            COMMENT ON COLUMN "projects"."name" IS 'Project name';
            COMMENT ON COLUMN "projects"."status" IS 'Project name';
            COMMENT ON COLUMN "projects"."url" IS 'Project URL';
            COMMENT ON COLUMN "projects"."stars" IS 'Number of stars';
            COMMENT ON COLUMN "projects"."forks" IS 'Number of forks';
            COMMENT ON COLUMN "projects"."openIssues" IS 'Number of open issues';
            COMMENT ON COLUMN "projects"."createdAt" IS 'Creation date in UTC Unix timestamp format';
            COMMENT ON COLUMN "projects"."repOwner" IS 'Owner repository';
            COMMENT ON COLUMN "projects"."error" IS 'Parsing error message';
            COMMENT ON COLUMN "projects"."ownerId" IS 'Relation to user'
        `);
    await queryRunner.query(`
            ALTER TABLE "projects"
            ADD CONSTRAINT "FK_a8e7e6c3f9d9528ed35fe5bae33" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "projects" DROP CONSTRAINT "FK_a8e7e6c3f9d9528ed35fe5bae33"
        `);
    await queryRunner.query(`
            DROP TABLE "projects"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."projects_status_enum"
        `);
    await queryRunner.query(`
            DROP TABLE "users"
        `);
  }
}
