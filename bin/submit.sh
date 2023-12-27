#!/bin/sh

mode=$1
platform=$2

if [ "$mode" == "production" ]; then
    echo "Submiting in production mode"
    if [ "$platform" == "android" ]; then
  		eas submit --profile production --platform android
    elif [ "$platform" == "ios" ]; then
  		eas submit --profile production --platform ios
    else
  		eas submit --profile production --platform all
    fi
#else
#    echo "Submiting in development mode"
#    if [ "$platform" == "android" ]; then
#  		eas submit --profile development --platform android
#    elif [ "$platform" == "ios" ]; then
#  		eas submit --profile development --platform ios
#    else
#  		eas submit --profile development --platform all
#    fi
fi
