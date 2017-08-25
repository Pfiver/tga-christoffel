#!/bin/bash

yql_url="https://query.yahooapis.com/v1/public/yql?q=\$query&env=\$env"
yql_query="select * from htmlstring where url in (\$quoted_urls)"
yql_env="store://datatables.org/alltableswithkeys"

house_url="https://shop.savognin.ch/Savognin/ukv/house/TDS00020010019636954"
calendar_url="https://shop.savognin.ch/Savognin/ukv/ajax/calendar/TDS00020010019636959?date=\$date&rand=\$rand"

tmpdata=$(mktemp)
trap "rm $tmpdata" EXIT

yql() {
    local query=$(IFS=, quoted_urls="$*" eval urlencode "\"$yql_query\"") env=$(urlencode "$yql_env")
#    echo "yql query: $query" >&2
    eval curl -s "\"$yql_url\"" | tee $tmpdata |
        xmlstarlet sel -D -t -e "results" -n -m "/query/results/result" -e "result" -v "." -n | xmlstarlet unesc
}
get() {
    curl -s -H'Cookie: tt=t' "$@" | tr -d '\r' | xmlstarlet -q fo --html --recover --dropdtd --omit-decl
}

urlencode() {
    python -c 'import sys,urllib; print urllib.quote(sys.argv[1]);' "$*"
}

#rand=$(yql "\"$house_url\"" |
rand=$(get "$house_url" |
            xmlstarlet sel -t -v "//span/@data-tp-calendar-rand")

urls=()
for ((i=0;i<12;i+=2))
do
    date=$(date +%Y-%m -dnow+${i}months)
#    eval "urls+=(\"\\\"$calendar_url\\\"\")"
    eval "urls+=(\"$calendar_url\")"
done

cd $(dirname "$0")

#echo "rand: $rand" >&2
#echo "urls: ${urls[*]}" >&2

n_retries=3

while true
do
#    yql "${urls[@]}" |
#        xmlstarlet sel -D -t -e "calendar-data" -n \
#            -m "/results/result/html/body/div[last()]/div[1]/div" -c "." -n \
#            -b -m "/results/result[last()]/html/body/div[last()]/div[2]" -c "." -n > target/site/calendar-data.xml
    get "${urls[@]}" |
        xmlstarlet sel -D -t -e "calendar-data" -n \
            -m "/html/body/div/div[1]/div" -c "." -n \
            -b -m "/html/body/div[last()]/div[2]"  -c "." -n > target/site/calendar-data.xml

    n_months=$(xmlstarlet sel -t \
                -v 'count(/calendar-data/*[not(contains(@class, "legend"))])' < target/site/calendar-data.xml)

    if [ $n_months -ne 12 ]
    then
        echo -n "$0: WARNING: only got $n_months months data for some reason"
        if let --n_retries
        then
            test $n_retries -gt 1 && s=s || s=
            echo " -- retrying $n_retries more time$s" >&2
        else
            echo " -- giving up" >&2
            exit 1
        fi
    else
        if [ $n_retries -ne 3 ]
        then
            echo "$0: INFO: got $n_months months data now -- all is well" >&2
        fi
        break
    fi
done
