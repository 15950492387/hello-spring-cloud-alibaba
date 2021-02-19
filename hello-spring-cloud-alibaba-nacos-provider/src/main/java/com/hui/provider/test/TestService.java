package com.hui.provider.test;

import com.alibaba.csp.sentinel.annotation.SentinelResource;
import org.springframework.stereotype.Service;

@Service
public class TestService {

    @SentinelResource("limiting")
    public String limiting(String name) {
       return "limiting" + name;
    }

}
