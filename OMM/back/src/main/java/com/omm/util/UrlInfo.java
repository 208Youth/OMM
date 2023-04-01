package com.omm.util;


import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

public class UrlInfo {

    private String fastapi;

    public String getFastapi() {
        return fastapi;
    }

    public void setFastapi(String fastapi) {
        this.fastapi = fastapi;
    }
}
