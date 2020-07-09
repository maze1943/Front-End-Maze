最近离职期闲暇时间，有想法拥有一台自己的服务器来搭建自己的web服务和node服务，有了想法就开搞
第一，趁着华为云618活动，88一年的云服务器（这么便宜直接买了三年的），配置1核2G，40GB云磁盘，1M带宽，系统Ubuntu18.04 64bit
安装nodejs
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs

安装yarn
curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
apt-get update && sudo apt-get install yarn

更新npm到淘宝镜像源
sudo npm config set registry https://registry.npm.taobao.org

全局安装node版本n管理器
sudo npm install n -g

安装最新稳定版node
sudo n stable