#!/bin/bash -e
# set -x

LOG_FILE=/srv/log/setup.log
mkdir -p /srv/log/
echo '' > $LOG_FILE

sudo locale-gen "en_US.UTF-8"
sudo locale-gen "fr_FR.UTF-8"
sudo sh -c "echo 'export LC_ALL=\"fr_FR.UTF-8\"' >> ~/.bashrc"  >> $LOG_FILE
source ~/.bashrc

echo 'Upgrade des paquets'
echo 'Upgrade des paquets' >> $LOG_FILE
sudo apt-get -q update > /dev/null

echo 'Installation de Postgres'
echo 'Installation de Postgres' >> $LOG_FILE
sudo apt-get install postgresql-9.5 postgresql-contrib-9.5 postgresql-9.5-postgis-2.2 postgresql-client-common -y  >> $LOG_FILE


echo "localhost:5432:*:ubuntu:-ubuntu-" >> ~/.pgpass
sudo chmod 600 ~/.pgpass
sudo -u postgres psql -c "CREATE USER ubuntu WITH PASSWORD '-ubuntu-';"  >> $LOG_FILE
sudo -u postgres psql -c "CREATE DATABASE vtile OWNER ubuntu;"  >> $LOG_FILE
sudo -u postgres psql -c "CREATE extension hstore; CREATE extension postgis;" vtile >> $LOG_FILE

# echo 'installation de Imposm3'
# echo 'installation de Imposm3' >> $LOG_FILE
# mkdir /srv/imposm3/
# cd /srv/imposm3/
# wget -q https://imposm.org/static/rel/imposm3-0.4.0dev-20170519-3f00374-linux-x86-64.tar.gz >> $LOG_FILE
# tar -xzf imposm3-0.4.0dev-20170519-3f00374-linux-x86-64.tar.gz >> $LOG_FILE
# mv imposm3-0.4.0dev-20170519-3f00374-linux-x86-64/* .
# rm imposm3-0.4.0dev-20170519-3f00374-linux-x86-64.tar.gz
# rm -r imposm3-0.4.0dev-20170519-3f00374-linux-x86-64

echo 'installation de t-rex'
curl -O -L https://github.com/pka/t-rex/releases/download/v0.7.8/t-rex-v0.7.8-x86_64-unknown-linux-gnu.deb && sudo dpkg -i t-rex-v0.7.8-x86_64-unknown-linux-gnu.deb

echo 'installation de Apache'
sudo apt install apache2 -y

sudo ln -s /srv/web /var/www/html/web

echo 'Creation de la table lines'
sudo -u postgres psql -c "create table lines (id varchar, name varchar, code varchar, ref_stif varchar, operator varchar, network varchar, mode varchar, colour varchar, shape varchar);" vtile >> $LOG_FILE

#
# \copy lines FROM '/srv/osm-transit-extractor_lines2.csv' delimiter ',' CSV
# delete from lines where id = 'id';
# alter table lines add column geom geometry(MultiLinestring, 3857);
# update lines set geom = ST_Transform(ST_GeomFromText(shape, 4326), 3857);
# CREATE INDEX ON lines UsiNG GIST(geom);
#
# select "id","name","code","ref_stif","operator","network","mode","colour", ST_SimplifyPreserveTopology(geom, 10) as geom  into lines10 from lines;
# CREATE INDEX ON lines10 UsiNG GIST(geom);
#
# select "id","name","code","ref_stif","operator","network","mode","colour", ST_SimplifyPreserveTopology(geom, 50) as geom  into lines50 from lines;
# CREATE INDEX ON lines50 UsiNG GIST(geom);
#
# select "id","name","code","ref_stif","operator","network","mode","colour", ST_SimplifyPreserveTopology(geom, 100) as geom  into lines100 from lines;
# CREATE INDEX ON lines100 UsiNG GIST(geom);
#
# t_rex genconfig --dbconn postgresql://ubuntu:-ubuntu-@localhost/vtile > /srv/trex.toml
# t_rex serve --config trex.toml --simplify true
# t_rex serve --dbconn postgresql://ubuntu:-ubuntu-@localhost/vtile
