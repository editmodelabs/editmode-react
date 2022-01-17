import React from "react";

const StepOne = () => {
  return (
    <div class="bg-white">
      <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div class="bg-indigo-700 rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
          <div class="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
            <div class="lg:self-center">
              <h2 class="text-2xl font-extrabold text-white sm:text-4xl">
                <span class="block"> Managing Content </span>
              </h2>
              <p class="mt-4 text-lg leading-6 text-indigo-200">
                In this section, you'll learn how about the two ways - the Magic
                Editor and the Admin Panel - in which you can edit content.
              </p>
            </div>
          </div>
          <div class="-mt-6 aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1">
            <img
              class="transform translate-x-6 translate-y-6 rounded-md object-cover object-left-top sm:translate-x-16 lg:translate-y-20"
              src="https://editmode.com/assets/hero-image-v2-nobg-a8fb824452a9662eb7584454ab9c2f93444d3236affd236cff3863e7b1bcc212.png"
              alt="App screenshot"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepOne;
