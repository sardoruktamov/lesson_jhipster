package uz.onlinejava.lessonjhipster.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

public class StudentTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static Student getStudentSample1() {
        return new Student().id(1L).name("name1").lastName("lastName1").age(1).phoneNumber("phoneNumber1").address("address1");
    }

    public static Student getStudentSample2() {
        return new Student().id(2L).name("name2").lastName("lastName2").age(2).phoneNumber("phoneNumber2").address("address2");
    }

    public static Student getStudentRandomSampleGenerator() {
        return new Student()
            .id(longCount.incrementAndGet())
            .name(UUID.randomUUID().toString())
            .lastName(UUID.randomUUID().toString())
            .age(intCount.incrementAndGet())
            .phoneNumber(UUID.randomUUID().toString())
            .address(UUID.randomUUID().toString());
    }
}
