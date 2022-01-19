#!/usr/bin/env bash
file='mysql/poolInfo.js'
num='^[0-9]+$'

echo  "Hello, this is the script for creating pool variables for the MySQL connection. Please anwer the questions bellow."
echo
echo  "What is you desired connection limmit to DB?"
while [ connectionLimit != $num ]; do
    echo -n  "(ENTER INTEGER NUMBER): "
    read -r connectionLimit
    if ! [[ $connectionLimit =~ $num ]] ; then
       echo "error: Not a number, try again";
    else
        break
    fi
done
echo

echo -n "What is the IP address of DataBase server? (Ex. 0.0.0.0 | localhost...): "
read -r host
echo

echo -n "What is the port? (Default port is 3306): "
read -r port
echo

echo "What is the name of the DB User?"
echo -n "User: "
read -r user

echo -n "Password: "
read -r password

echo -n "Name of the database: "
read -r database
echo

touch $file
echo "module.exports = {" > $file
echo -e "\tconnectionLimit: $connectionLimit," >> $file
echo -e "\thost: '$host'," >> $file
if [[ -z $port ]]; 
    then echo -e "\tport: 3306," >> $file
    else echo -e "\tport: $port," >> $file
fi
echo -e "\tuser: '$user'," >> $file
echo -e "\tpassword: '$password'," >> $file
echo -e "\tdatabase: '$database'" >> $file
echo "};" >> $file
echo "Done! You can view your file at $PWD/$file"
