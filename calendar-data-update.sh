#!/bin/bash

set -ex

# q1$ curl -v -o /tmp/y-out.xml "https://query.yahooapis.com/v1/public/yql?q=select%20%2A%20from%20htmlstring%20where%20url%20in%20%28%22https%3A//shop.savognin.ch/Savognin/ukv/house/TDS00020010060539805%22%29&env=store%3A//datatables.org/alltableswithkeys" # | //query/results/result
# q2$ xmlstarlet sel -t -v "//query/results/result" < /tmp/y-out.xml | xmlstarlet unesc | xmlstarlet sel -t -v "//span/@data-tp-calendar-rand"
# q0$ python -c 'import sys,urllib;print urllib.quote(sys.argv[1]);' "select * from htmlstring where url in (\"https://shop.savognin.ch/Savognin/ukv/house/TDS00020010060539805\")"
# q0$ python -c 'import sys,urllib;print urllib.quote(sys.argv[1]);' "store://datatables.org/alltableswithkeys"
# q0$ curl -v -o /tmp/y-out.xml "https://query.yahooapis.com/v1/public/yql?q=&env=" # | //query/results/result
# q0$ TDS00020010019636959
# q0$ https://shop.savognin.ch/Savognin/ukv/ajax/calendar/TDS00020010019636959?date=

urlencode() { python -c 'import sys,urllib;print urllib.quote(sys.argv[1]);' "$*"; }

yql_url="https://query.yahooapis.com/v1/public/yql?q=\$query&env=\$env"

yql_query="select * from htmlstring where url in (\$quoted_urls)"

yql_env="store://datatables.org/alltableswithkeys"

house_url="https://shop.savognin.ch/Savognin/ukv/house/TDS00020010019636954"

calendar_url="https://shop.savognin.ch/Savognin/ukv/ajax/calendar/TDS00020010019636959?date=\$date&rand=\$rand"

yql() {
    local query url

    IFS=, quoted_urls="$*" eval "query=\"$yql_query\""

    query=$(urlencode "$query") env=$(urlencode "$yql_env") eval "url=\"$yql_url\""

    curl -s "$url"
}

rand=$(yql "\"$house_url\"" |
        xmlstarlet sel -t -v "//query/results/result" |
        xmlstarlet unesc | xmlstarlet sel -t -v "//span/@data-tp-calendar-rand")

urls=()
for ((i=0;i<12;i+=2))
do
    date=$(date +%Y-%m -dnow+${i}months)
    eval "urls+=(\"\\\"$calendar_url\\\"\")"
done

yql "${urls[@]}" > calendar-data.xml
