package com.hui.consumer.test;

import com.alibaba.csp.sentinel.annotation.SentinelResource;
import com.hui.consumer.fegin.ProvideTestFegin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("test")
public class TestController {

    @Qualifier("provider")
    @Autowired
    private ProvideTestFegin provideTestFegin;

    @GetMapping("testProvider")
    @SentinelResource("test")
    public String test() {
        String sayHi = provideTestFegin.sayHi();
        String test = provideTestFegin.test("哇哇哇");
        String sayHiTwo = provideTestFegin.sayHi();
        String testTwo = provideTestFegin.test("哇哇哇");
        return "接口一：" + sayHi + "接口二：" + test;
    }

}
