package com.omm.util;


import org.springframework.beans.factory.annotation.Value;

public class UrlInfo {

    @Value("${url.fasturl}")
    private static String fastUrl;

    public static String getFastUrl(){
        return fastUrl;
    }

}
