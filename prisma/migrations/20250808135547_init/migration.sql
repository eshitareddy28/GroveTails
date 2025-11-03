-- CreateIndex
CREATE INDEX "Pet_breed_idx" ON "public"."Pet"("breed");

-- CreateIndex
CREATE INDEX "Pet_shelterId_idx" ON "public"."Pet"("shelterId");

-- CreateIndex
CREATE INDEX "Tag_name_idx" ON "public"."Tag"("name");
