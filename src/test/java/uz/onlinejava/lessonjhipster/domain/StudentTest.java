package uz.onlinejava.lessonjhipster.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static uz.onlinejava.lessonjhipster.domain.StudentTestSamples.*;

import org.junit.jupiter.api.Test;
import uz.onlinejava.lessonjhipster.web.rest.TestUtil;

class StudentTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Student.class);
        Student student1 = getStudentSample1();
        Student student2 = new Student();
        assertThat(student1).isNotEqualTo(student2);

        student2.setId(student1.getId());
        assertThat(student1).isEqualTo(student2);

        student2 = getStudentSample2();
        assertThat(student1).isNotEqualTo(student2);
    }
}
