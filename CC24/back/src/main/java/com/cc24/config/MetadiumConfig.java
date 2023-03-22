package com.cc24.config;

import com.metadium.did.protocol.MetaDelegator;
import com.metaidum.did.resolver.client.DIDResolverAPI;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MetadiumConfig {

    @Value("${metadium.apikey}")
    private String apiKey;

//    @Bean
//    public MetaDelegator setupMainnet() {
//        return new MetaDelegator();
//    }

    @Bean
    public MetaDelegator setupTestnet() {
        MetaDelegator delegator = new MetaDelegator("https://testdelegator.metadium.com",
            "https://api.metadium.com/dev",
            "did:meta:testnet",
            apiKey);
        DIDResolverAPI
            .getInstance()
            .setResolverUrl("https://testnetresolver.metadium.com/1.0/");
        return delegator;
    }

}
