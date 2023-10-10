#!/bin/sh

mode=$1
platform=$2

if [ "$mode" == "production" ]; then
    echo "Building in production mode"
    if [ "$platform" == "android" ]; then
  		eas build --profile production --platform android
    elif [ "$platform" == "ios" ]; then
  		eas build --profile production --platform ios
    else
  		eas build --profile production --platform all
    fi
else
    echo "Building in development mode"
    if [ "$platform" == "android" ]; then
  		eas build --profile development --platform android
    elif [ "$platform" == "ios" ]; then
  		eas build --profile development --platform ios
    else
  		eas build --profile development --platform all
    fi
fi
