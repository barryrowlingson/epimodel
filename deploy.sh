#!/bin/sh

WEB="/home/rowlings/.gvfs/rowlings on wwwmaths"

if [ -d "$WEB" ] ; then
    echo Web space at $WEB found
else
    echo Exiting - web space not mounted
    exit 1
fi

DEST="$WEB"/Chicas/epimodel
echo $DEST

rsync -rvz -C ../sirweb/ "$DEST"
