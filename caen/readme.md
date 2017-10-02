Depuis le répertoire `/srv/`
1. créer la base de données
```
sudo -u postgres bash -c "createdb -E UTF8 -T template0 -O ubuntu caen;"
sudo -u postgres psql -c "CREATE extension hstore; CREATE extension postgis;" caen
```
2. import des données :
`./imposm3/imposm3 import -mapping ./caen/imposm_import.yml -read ./caen/fr-nw-caen.osm.pbf -overwritecache -write -connection postgis://ubuntu@localhost/caen -deployproduction `

3. lancer le serveur trex :
`t_rex serve -c ./caen/trex.toml --simplify true`
