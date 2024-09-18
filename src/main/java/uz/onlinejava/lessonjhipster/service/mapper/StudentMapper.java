package uz.onlinejava.lessonjhipster.service.mapper;

import org.mapstruct.*;
import uz.onlinejava.lessonjhipster.domain.Student;
import uz.onlinejava.lessonjhipster.service.dto.StudentDTO;

/**
 * Mapper for the entity {@link Student} and its DTO {@link StudentDTO}.
 */
@Mapper(componentModel = "spring")
public interface StudentMapper extends EntityMapper<StudentDTO, Student> {}
