/* tslint:disable max-line-length */
import axios from 'axios';
import sinon from 'sinon';
import dayjs from 'dayjs';

import StudentService from './student.service';
import { DATE_TIME_FORMAT } from '@/shared/composables/date-format';
import { Student } from '@/shared/model/student.model';

const error = {
  response: {
    status: null,
    data: {
      type: null,
    },
  },
};

const axiosStub = {
  get: sinon.stub(axios, 'get'),
  post: sinon.stub(axios, 'post'),
  put: sinon.stub(axios, 'put'),
  patch: sinon.stub(axios, 'patch'),
  delete: sinon.stub(axios, 'delete'),
};

describe('Service Tests', () => {
  describe('Student Service', () => {
    let service: StudentService;
    let elemDefault;
    let currentDate: Date;

    beforeEach(() => {
      service = new StudentService();
      currentDate = new Date();
      elemDefault = new Student(123, 'AAAAAAA', 'AAAAAAA', 0, currentDate, 'AAAAAAA', 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            birthOfDay: dayjs(currentDate).format(DATE_TIME_FORMAT),
          },
          elemDefault,
        );
        axiosStub.get.resolves({ data: returnedFromService });

        return service.find(123).then(res => {
          expect(res).toMatchObject(elemDefault);
        });
      });

      it('should not find an element', async () => {
        axiosStub.get.rejects(error);
        return service
          .find(123)
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should create a Student', async () => {
        const returnedFromService = Object.assign(
          {
            id: 123,
            birthOfDay: dayjs(currentDate).format(DATE_TIME_FORMAT),
          },
          elemDefault,
        );
        const expected = Object.assign(
          {
            birthOfDay: currentDate,
          },
          returnedFromService,
        );

        axiosStub.post.resolves({ data: returnedFromService });
        return service.create({}).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should not create a Student', async () => {
        axiosStub.post.rejects(error);

        return service
          .create({})
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should update a Student', async () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            lastName: 'BBBBBB',
            age: 1,
            birthOfDay: dayjs(currentDate).format(DATE_TIME_FORMAT),
            phoneNumber: 'BBBBBB',
            address: 'BBBBBB',
          },
          elemDefault,
        );

        const expected = Object.assign(
          {
            birthOfDay: currentDate,
          },
          returnedFromService,
        );
        axiosStub.put.resolves({ data: returnedFromService });

        return service.update(expected).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should not update a Student', async () => {
        axiosStub.put.rejects(error);

        return service
          .update({})
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should partial update a Student', async () => {
        const patchObject = Object.assign(
          {
            name: 'BBBBBB',
            age: 1,
            birthOfDay: dayjs(currentDate).format(DATE_TIME_FORMAT),
            phoneNumber: 'BBBBBB',
          },
          new Student(),
        );
        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            birthOfDay: currentDate,
          },
          returnedFromService,
        );
        axiosStub.patch.resolves({ data: returnedFromService });

        return service.partialUpdate(patchObject).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should not partial update a Student', async () => {
        axiosStub.patch.rejects(error);

        return service
          .partialUpdate({})
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should return a list of Student', async () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            lastName: 'BBBBBB',
            age: 1,
            birthOfDay: dayjs(currentDate).format(DATE_TIME_FORMAT),
            phoneNumber: 'BBBBBB',
            address: 'BBBBBB',
          },
          elemDefault,
        );
        const expected = Object.assign(
          {
            birthOfDay: currentDate,
          },
          returnedFromService,
        );
        axiosStub.get.resolves([returnedFromService]);
        return service.retrieve({ sort: {}, page: 0, size: 10 }).then(res => {
          expect(res).toContainEqual(expected);
        });
      });

      it('should not return a list of Student', async () => {
        axiosStub.get.rejects(error);

        return service
          .retrieve()
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should delete a Student', async () => {
        axiosStub.delete.resolves({ ok: true });
        return service.delete(123).then(res => {
          expect(res.ok).toBeTruthy();
        });
      });

      it('should not delete a Student', async () => {
        axiosStub.delete.rejects(error);

        return service
          .delete(123)
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });
    });
  });
});
