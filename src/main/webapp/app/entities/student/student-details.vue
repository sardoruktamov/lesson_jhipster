<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="student">
        <h2 class="jh-entity-heading" data-cy="studentDetailsHeading">
          <span v-text="t$('lessonJhipsterApp.student.detail.title')"></span> {{ student.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="t$('lessonJhipsterApp.student.name')"></span>
          </dt>
          <dd>
            <span>{{ student.name }}</span>
          </dd>
          <dt>
            <span v-text="t$('lessonJhipsterApp.student.lastName')"></span>
          </dt>
          <dd>
            <span>{{ student.lastName }}</span>
          </dd>
          <dt>
            <span v-text="t$('lessonJhipsterApp.student.age')"></span>
          </dt>
          <dd>
            <span>{{ student.age }}</span>
          </dd>
          <dt>
            <span v-text="t$('lessonJhipsterApp.student.birthOfDay')"></span>
          </dt>
          <dd>
            <span v-if="student.birthOfDay">{{ formatDateLong(student.birthOfDay) }}</span>
          </dd>
          <dt>
            <span v-text="t$('lessonJhipsterApp.student.phoneNumber')"></span>
          </dt>
          <dd>
            <span>{{ student.phoneNumber }}</span>
          </dd>
          <dt>
            <span v-text="t$('lessonJhipsterApp.student.address')"></span>
          </dt>
          <dd>
            <span>{{ student.address }}</span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.back')"></span>
        </button>
        <router-link v-if="student.id" :to="{ name: 'StudentEdit', params: { studentId: student.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.edit')"></span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./student-details.component.ts"></script>
