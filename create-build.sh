#bin/bash
echo 'init new build'
npx tsc
echo 'remove old build'
rm -rf ../../builds/sale/api/build
echo 'create new build'
cp -rf build/ ../../builds/sale/api/build
echo 'end'