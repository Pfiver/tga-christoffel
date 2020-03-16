#!/bin/sh

# Alt: https://shop.savognin.ch/Savognin/ukv/house/TDS00020010019636954
# Neu: https://savognin.graubuenden.ch/de/node/20583#/unterkuenfte/CH1/c0195db2-2db6-47d5-9453-414a27e7d694/tga-christoffel

api_base=https://webapi.deskline.net/savognin/de/accommodations/CH1/products/bb3b5913-07a0-4893-88c5-6a1d52278ea5

from_date=$(perl -e 'use Time::Piece; use Time::Local; $t=localtime timelocal(0, 0, 0, 1, localtime->_mon, localtime->year); print $t->ymd;')
to_date=$(perl -e 'use Time::Piece; use Time::Seconds; use Time::Local; $t=localtime timelocal(0, 0, 0, 1, localtime->_mon, localtime->year+1); $t-=ONE_DAY; print $t->ymd;')

#api_params="fields=availabilityCalendar(fromDate:\"$from_date\",toDate:\"$to_date\"){date,available,canArrive,canDepart,minStay,maxStay,stayInterval}"
api_params="fields=availabilityCalendar(fromDate:\"$from_date\",toDate:\"$to_date\"){date,available}"

api_params="$api_params&spId=c0195db2-2db6-47d5-9453-414a27e7d694"

curl -gs "$api_base?$api_params"
