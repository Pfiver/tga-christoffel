#!/bin/sh

# Alt: https://shop.savognin.ch/Savognin/ukv/house/TDS00020010019636954
# Neu: https://savognin.graubuenden.ch/de/node/20583#/unterkuenfte/CH1/c0195db2-2db6-47d5-9453-414a27e7d694/tga-christoffel

api_base=https://webapi.deskline.net/savognin/de/accommodations/CH1/products/bb3b5913-07a0-4893-88c5-6a1d52278ea5

from_date=$(perl -e "use Time::Piece; print localtime->strftime('%Y-%m-01');")
to_date=$(perl -e "use Time::Piece; print localtime->add_months(11)->strftime('%Y-%m-31');")

#api_params="fields=availabilityCalendar(fromDate:\"$from_date\",toDate:\"$to_date\")\\{date,available,canArrive,canDepart,minStay,maxStay,stayInterval\\}"
api_params="fields=availabilityCalendar(fromDate:\"$from_date\",toDate:\"$to_date\")\\{date,available\\}"

curl -s "$api_base?$api_params"
