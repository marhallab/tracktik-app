<template>
  <div class="accordion mb-4 filter" id="accordionFilter">
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingFilter">
        <button
          class="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseFilter"
          aria-expanded="true"
          aria-controls="collapseFilter"
        >
          Filters
        </button>
      </h2>
      <div
        id="collapseFilter"
        class="accordion-collapse collapse show"
        aria-labelledby="headingFilter"
        data-bs-parent="#accordionFilter"
      >
        <div class="accordion-body">
          <slot name="content" />
        </div>
      </div>
    </div>
  </div>
</template>
