package com.hui.consumer.fegin;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(qualifier="provider", name = "provider", fallback = ProvideTestCallBack.class)
public interface ProvideTestFegin {

    @GetMapping(value = "/test/hi")
    String sayHi();

    @GetMapping(value = "/test/{message}")
    String test(@PathVariable String message);
}
