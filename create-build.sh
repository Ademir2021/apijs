#bin/bash
clear
npx tsc
rm -rf ../api-centroinfo/build
echo 'Criando nova build'
cp -rf build/ ../api-centroinfo
# cp -rf node_modules ../api-centroinfo
echo 'build api-centroinfo gerada com sucesso'