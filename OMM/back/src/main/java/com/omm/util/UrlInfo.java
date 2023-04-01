package com.omm.util;


import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class UrlInfo implements InitializingBean {

    private final String fastapi;
    private final String ommFront;
    private final String cc24Front;
    private final String nodeapi;

    public UrlInfo(
            @Value("${url.fastapi}") String fastapi,
            @Value("${url.ommfront}") String ommFront,
            @Value("${url.cc24front}") String cc24Front,
            @Value("${url.nodeapi}") String nodeapi
    ){
        this.fastapi = fastapi;
        this.ommFront = ommFront;
        this.cc24Front = cc24Front;
        this.nodeapi = nodeapi;
    }

    @Override
    public void afterPropertiesSet() throws Exception {

    }

    public String getFastapi(){
        return this.fastapi;
    }

    public String getOmmFront(){
        return this.ommFront;
    }

    public String getCc24Front(){
        return this.cc24Front;
    }

    public String getNodeapi(){
        return this.nodeapi;
    }
}
