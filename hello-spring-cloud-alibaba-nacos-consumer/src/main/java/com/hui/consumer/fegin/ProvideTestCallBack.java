package com.hui.consumer.fegin;

import org.springframework.stereotype.Component;

@Component
public class ProvideTestCallBack implements ProvideTestFegin {
    @Override
    public String sayHi() {
        return "你TMD发错了,搞啥哇";
    }

    @Override
    public String test(String message) {
        return "你TMD发错了,搞啥哇，这是第二个错误了";
    }
}
