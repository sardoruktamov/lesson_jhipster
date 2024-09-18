<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" novalidate v-on:submit.prevent="save()">
        <h2
          id="lessonJhipsterApp.student.home.createOrEditLabel"
          data-cy="StudentCreateUpdateHeading"
          v-text="t$('lessonJhipsterApp.student.home.createOrEditLabel')"
        ></h2>
        <div>
          <div class="form-group" v-if="student.id">
            <label for="id" v-text="t$('global.field.id')"></label>
            <input type="text" class="form-control" id="id" name="id" v-model="student.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('lessonJhipsterApp.student.name')" for="student-name"></label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="student-name"
              data-cy="name"
              :class="{ valid: !v$.name.$invalid, invalid: v$.name.$invalid }"
              v-model="v$.name.$model"
              required
            />
            <div v-if="v$.name.$anyDirty && v$.name.$invalid">
              <small class="form-text text-danger" v-for="error of v$.name.$errors" :key="error.$uid">{{ error.$message }}</small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('lessonJhipsterApp.student.lastName')" for="student-lastName"></label>
            <input
              type="text"
              class="form-control"
              name="lastName"
              id="student-lastName"
              data-cy="lastName"
              :class="{ valid: !v$.lastName.$invalid, invalid: v$.lastName.$invalid }"
              v-model="v$.lastName.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('lessonJhipsterApp.student.age')" for="student-age"></label>
            <input
              type="number"
              class="form-control"
              name="age"
              id="student-age"
              data-cy="age"
              :class="{ valid: !v$.age.$invalid, invalid: v$.age.$invalid }"
              v-model.number="v$.age.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('lessonJhipsterApp.student.birthOfDay')" for="student-birthOfDay"></label>
            <div class="d-flex">
              <input
                id="student-birthOfDay"
                data-cy="birthOfDay"
                type="datetime-local"
                class="form-control"
                name="birthOfDay"
                :class="{ valid: !v$.birthOfDay.$invalid, invalid: v$.birthOfDay.$invalid }"
                :value="convertDateTimeFromServer(v$.birthOfDay.$model)"
                @change="updateInstantField('birthOfDay', $event)"
              />
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('lessonJhipsterApp.student.phoneNumber')" for="student-phoneNumber"></label>
            <input
              type="text"
              class="form-control"
              name="phoneNumber"
              id="student-phoneNumber"
              data-cy="phoneNumber"
              :class="{ valid: !v$.phoneNumber.$invalid, invalid: v$.phoneNumber.$invalid }"
              v-model="v$.phoneNumber.$model"
              required
            />
            <div v-if="v$.phoneNumber.$anyDirty && v$.phoneNumber.$invalid">
              <small class="form-text text-danger" v-for="error of v$.phoneNumber.$errors" :key="error.$uid">{{ error.$message }}</small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('lessonJhipsterApp.student.address')" for="student-address"></label>
            <input
              type="text"
              class="form-control"
              name="address"
              id="student-address"
              data-cy="address"
              :class="{ valid: !v$.address.$invalid, invalid: v$.address.$invalid }"
              v-model="v$.address.$model"
            />
          </div>
        </div>
        <div>
          <button type="button" id="cancel-save" data-cy="entityCreateCancelButton" class="btn btn-secondary" v-on:click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.cancel')"></span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="v$.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.save')"></span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./student-update.component.ts"></script>
