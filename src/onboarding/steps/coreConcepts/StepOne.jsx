import React from "react";

const StepOne = () => {
  return (
    <div class="bg-white">
      <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div class="bg-indigo-700 rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
          <div class="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
            <div class="lg:self-center">
              <h2 class="text-2xl font-extrabold text-white sm:text-4xl">
                <span class="block"> Welcome </span>
              </h2>
              <p class="mt-4 text-lg leading-6 text-indigo-200">
                In this section, you'll learn a little a bit about what Editmode
                does.
              </p>
            </div>
          </div>
          <div class="-mt-6 aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1">
            <img
              class="transform translate-x-6 translate-y-6 rounded-md object-cover object-left-top sm:translate-x-16 lg:translate-y-20"
              src="https://img.editmode.com/production/content_pieces/cnk_94a926ac8209abd94b2c/98CipzYMT2eD/images/original/Screenshot_2020-06-01_at_13.41.56.png"
              alt="App screenshot"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepOne;
