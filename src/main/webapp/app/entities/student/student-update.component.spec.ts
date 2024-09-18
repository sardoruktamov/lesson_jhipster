/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, type MountingOptions } from '@vue/test-utils';
import sinon, { type SinonStubbedInstance } from 'sinon';
import { type RouteLocation } from 'vue-router';

import dayjs from 'dayjs';
import StudentUpdate from './student-update.vue';
import StudentService from './student.service';
import { DATE_TIME_LONG_FORMAT } from '@/shared/composables/date-format';
import AlertService from '@/shared/alert/alert.service';

type StudentUpdateComponentType = InstanceType<typeof StudentUpdate>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const studentSample = { id: 123 };

describe('Component Tests', () => {
  let mountOptions: MountingOptions<StudentUpdateComponentType>['global'];
  let alertService: AlertService;

  describe('Student Management Update Component', () => {
    let comp: StudentUpdateComponentType;
    let studentServiceStub: SinonStubbedInstance<StudentService>;

    beforeEach(() => {
      route = {};
      studentServiceStub = sinon.createStubInstance<StudentService>(StudentService);
      studentServiceStub.retrieve.onFirstCall().resolves(Promise.resolve([]));

      alertService = new AlertService({
        i18n: { t: vitest.fn() } as any,
        bvToast: {
          toast: vitest.fn(),
        } as any,
      });

      mountOptions = {
        stubs: {
          'font-awesome-icon': true,
          'b-input-group': true,
          'b-input-group-prepend': true,
          'b-form-datepicker': true,
          'b-form-input': true,
        },
        provide: {
          alertService,
          studentService: () => studentServiceStub,
        },
      };
    });

    afterEach(() => {
      vitest.resetAllMocks();
    });

    describe('load', () => {
      beforeEach(() => {
        const wrapper = shallowMount(StudentUpdate, { global: mountOptions });
        comp = wrapper.vm;
      });
      it('Should convert date from string', () => {
        // GIVEN
        const date = new Date('2019-10-15T11:42:02Z');

        // WHEN
        const convertedDate = comp.convertDateTimeFromServer(date);

        // THEN
        expect(convertedDate).toEqual(dayjs(date).format(DATE_TIME_LONG_FORMAT));
      });

      it('Should not convert date if date is not present', () => {
        expect(comp.convertDateTimeFromServer(null)).toBeNull();
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const wrapper = shallowMount(StudentUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.student = studentSample;
        studentServiceStub.update.resolves(studentSample);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(studentServiceStub.update.calledWith(studentSample)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        studentServiceStub.create.resolves(entity);
        const wrapper = shallowMount(StudentUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.student = entity;

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(studentServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        studentServiceStub.find.resolves(studentSample);
        studentServiceStub.retrieve.resolves([studentSample]);

        // WHEN
        route = {
          params: {
            studentId: '' + studentSample.id,
          },
        };
        const wrapper = shallowMount(StudentUpdate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(comp.student).toMatchObject(studentSample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        studentServiceStub.find.resolves(studentSample);
        const wrapper = shallowMount(StudentUpdate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});
