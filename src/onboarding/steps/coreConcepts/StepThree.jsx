import React from "react";

const StepThree = () => {
  return (
    <div class="bg-white">
      <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div class="bg-indigo-700 rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
          <div class="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
            <div class="lg:self-center">
              <h2 class="text-2xl font-extrabold text-white sm:text-4xl">
                <span class="block"> Core Concepts</span>
              </h2>
              <p class="mt-4 text-lg leading-6 text-indigo-200">
                In this section, you'll learn the definitions of core concepts
                in Editmode like chunks, collections, and tags.
              </p>
            </div>
          </div>
          <div class="-mt-6 aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1">
            <img
              class="transform translate-x-6 translate-y-6 rounded-md object-cover object-left-top sm:translate-x-16 lg:translate-y-20"
              src="https://editmode.gitbook.io/~/files/v0/b/gitbook-28427.appspot.com/o/assets%2F-MXQVCL50RwglOms2GWH%2F-MXWMB2VQZZDnEp4S-4E%2F-MXWMsB5NZlx2Dv9DAJn%2Fmodels.jpg?alt=media&token=31f8b5c6-ced5-4982-88a8-93eec0319afa"
              alt="App screenshot"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepThree;
