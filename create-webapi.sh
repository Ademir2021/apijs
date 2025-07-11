#bin/bash
clear
npx tsc
rm -rf ../../Dockers/webapi/build/
echo 'Criando nova build para webapi'
cp -rf build/ ../../Dockers/webapi/build/
# cp -rf node_modules ../api-centroinfo
echo 'build webapi gerada com sucesso'