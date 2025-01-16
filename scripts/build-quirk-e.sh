#!/usr/bin/env bash

FILE_FORMATTING="\e[1;4m"
BUSY_FORMATTING="\e[1;33m"
DONE_FORMATTING="\e[1;32m"
RESET_FORMATTING="\e[0m"

FILE="${FILE_FORMATTING}$(basename "$0")${RESET_FORMATTING} > "

echo -e "${FILE}${BUSY_FORMATTING}Cloning GitHub Repository...${RESET_FORMATTING}"
git clone https://github.com/DEQSE-Project/Quirk-E ./tmp/quirk-e/

cd ./tmp/quirk-e/

echo -e "\n${FILE}${BUSY_FORMATTING}Installing Packages...${RESET_FORMATTING}"
npm install

echo -e "\n${FILE}${BUSY_FORMATTING}Building Output...${RESET_FORMATTING}"
npm run build
cd ../../
mkdir -p ./out/external/
cp ./tmp/quirk-e/out/index.html ./out/external/quirk-e.html

echo -e "\n${FILE}${BUSY_FORMATTING}Cleaning Up...${RESET_FORMATTING}"
rm -rf ./tmp/quirk-e/

echo -e "\n${FILE}${DONE_FORMATTING}Done.${RESET_FORMATTING}"
