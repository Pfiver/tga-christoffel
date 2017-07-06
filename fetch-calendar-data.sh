#!/bin/bash

yql_url="https://query.yahooapis.com/v1/public/yql?q=\$query&env=\$env"
yql_query="select * from htmlstring where url in (\$quoted_urls)"
yql_env="store://datatables.org/alltableswithkeys"

house_url="https://shop.savognin.ch/Savognin/ukv/house/TDS00020010019636954"
calendar_url="https://shop.savognin.ch/Savognin/ukv/ajax/calendar/TDS00020010019636959?date=\$date&rand=\$rand"

yql() {
    local query=$(IFS=, quoted_urls="$*" eval urlencode "\"$yql_query\"") env=$(urlencode "$yql_env")
#    echo "yql query: $query" >&2
    eval curl -s "\"$yql_url\"" | # tee /dev/stderr |
        xmlstarlet sel -D -t -e "results" -n -m "/query/results/result" -e "result" -v "." -n | xmlstarlet unesc
}
urlencode() {
    python -c 'import sys,urllib;print urllib.quote(sys.argv[1]);' "$*"
}

rand=$(yql "\"$house_url\"" |
            xmlstarlet sel -t -v "//span/@data-tp-calendar-rand")

urls=()
for ((i=0;i<12;i+=2))
do
    date=$(date +%Y-%m -dnow+${i}months)
    eval "urls+=(\"\\\"$calendar_url\\\"\")"
done

#echo "rand: $rand" >&2
#echo "urls: ${urls[*]}" >&2
yql "${urls[@]}" |
    xmlstarlet sel -D -t -e "calendar-data" -n \
        -m "/yql/html/body/div[last()]/div[1]/div" -c "." -n \
        -b -m "/yql/html[last()]/body/div[last()]/div[2]" -c "." -n
