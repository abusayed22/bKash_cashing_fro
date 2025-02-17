-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "fullname" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "otp" TEXT NOT NULL,
    "token" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "fullname" TEXT,
    "number" TEXT,
    "address" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sendmoney" (
    "id" SERIAL NOT NULL,
    "clientid" INTEGER NOT NULL,
    "number" TEXT,
    "amount" DECIMAL(30,2),
    "method" TEXT,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sendmoney_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Receivedmoney" (
    "id" SERIAL NOT NULL,
    "clientid" INTEGER NOT NULL,
    "number" TEXT,
    "amount" DECIMAL(30,2),
    "method" TEXT,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Receivedmoney_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "History" (
    "id" SERIAL NOT NULL,
    "clientid" INTEGER NOT NULL,
    "amount" DECIMAL(30,2) NOT NULL,
    "note" TEXT,
    "status" TEXT,
    "number" TEXT,
    "method" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_id_key" ON "Admin"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Client_id_key" ON "Client"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Sendmoney_id_key" ON "Sendmoney"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Receivedmoney_id_key" ON "Receivedmoney"("id");

-- CreateIndex
CREATE UNIQUE INDEX "History_id_key" ON "History"("id");

-- AddForeignKey
ALTER TABLE "Sendmoney" ADD CONSTRAINT "Sendmoney_clientid_fkey" FOREIGN KEY ("clientid") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receivedmoney" ADD CONSTRAINT "Receivedmoney_clientid_fkey" FOREIGN KEY ("clientid") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_clientid_fkey" FOREIGN KEY ("clientid") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
