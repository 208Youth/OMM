package com.omm.util;


import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class UrlInfo implements InitializingBean {

    private final String fastapi;
    private final String ommFront;

    private final String cc24Front;

    public UrlInfo(
            @Value("${url.fastapi}") String fastapi,
            @Value("${url.ommfront}") String ommFront,
            @Value("${url.cc24front}") String cc24Front
    ){
        this.fastapi = fastapi;
        this.ommFront = ommFront;
        this.cc24Front = cc24Front;
    }

    @Override
    public void afterPropertiesSet() throws Exception {

    }

    public String getFastapi(){
        return this.fastapi;
    }
}
