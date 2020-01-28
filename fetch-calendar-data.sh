#!/bin/bash

cd $(dirname "$0")

curl -s 'https://webapi.deskline.net/savognin/de/accommodations/CH1/products/bb3b5913-07a0-4893-88c5-6a1d52278ea5?fields=availabilityCalendar(fromDate:"'$(date +%Y)'-01-01",toDate:"'$(date +%Y)'-12-31")\{date,available,canArrive,canDepart,minStay,maxStay,stayInterval\}' > target/site/calendar-data.json
