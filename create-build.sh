#bin/bash
npx tsc
rm -rf ../api-centroinfo/build
echo 'Criando nova build'
cp -rf build/ ../api-centroinfo
echo 'build api-centroinfo gerada com sucesso'