-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "task" TEXT NOT NULL,
    "description" TEXT,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);
