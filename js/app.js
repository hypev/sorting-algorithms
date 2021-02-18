var vm = new Vue({
   el: "#app",
   data: {
      algorithms: [
         {
            name: "Merge Sort",
            func: function () {
               let merge = function (l, m, r, animation, vm) {
                  let n1 = m - l + 1;
                  let n2 = r - m;

                  let L = [];
                  let R = [];

                  for (let i = 0; i < n1; i++) {
                     L.push(vm.arr[l + i]);
                  }
                  for (let i = 0; i < n2; i++) {
                     R.push(vm.arr[m + 1 + i]);
                  }

                  let i = 0, j = 0, k = l;
                  while (i < n1 && j < n2) {
                     animation.push({
                        ids: [l + i, j + m + 1],
                        vals: [L[i], R[j]],
                        bgs: ['compare', 'compare']
                     });
                     animation.push({
                        ids: [l + i, j + m + 1],
                        vals: [L[i], R[j]],
                        bgs: ['static', 'static']
                     });
                     vm.comparison++;
                     if (L[i] <= R[j]) {
                        animation.push({
                           ids: [l + i, k],
                           vals: [L[i], vm.arr[k]],
                           bgs: ['swap', 'swap']
                        });
                        vm.arr[k] = L[i];
                        animation.push({
                           ids: [l + i, k],
                           vals: [L[i], vm.arr[k]],
                           bgs: ['static', 'static']
                        });
                        i++;
                     } else {
                        animation.push({
                           ids: [j + m + 1, k],
                           vals: [R[j], vm.arr[k]],
                           bgs: ['swap', 'swap']
                        });
                        vm.arr[k] = R[j];
                        animation.push({
                           ids: [j + m + 1, k],
                           vals: [R[j], vm.arr[k]],
                           bgs: ['static', 'static']
                        });
                        j++
                     }
                     k++;
                  }

                  while (i < n1) {
                     animation.push({
                        ids: [k, i + l],
                        vals: [vm.arr[k], L[i]],
                        bgs: ['swap', 'swap']
                     });
                     vm.arr[k] = L[i];
                     animation.push({
                        ids: [k, i + l],
                        vals: [vm.arr[k], L[i]],
                        bgs: ['static', 'static']
                     });
                     i++;
                     k++;
                  }

                  while (j < n2) {
                     animation.push({
                        ids: [k, j + m + 1],
                        vals: [vm.arr[k], R[j]],
                        bgs: ['swap', 'swap']
                     });
                     vm.arr[k] = R[j];
                     animation.push({
                        ids: [k, j + m + 1],
                        vals: [vm.arr[k], R[j]],
                        bgs: ['static', 'static']
                     });
                     j++;
                     k++;
                  }
               }
               let sort = function (l, r, animation, vm) {
                  if (l < r) {
                     let m = Math.floor((l + r) / 2);

                     sort(l, m, animation, vm);
                     sort(m + 1, r, animation, vm);

                     merge(l, m, r, animation, vm);
                  }
               }

               let animation = [];
               const startTime = Date.now();
               sort(0, this.arr.length - 1, animation, this);
               this.time = Date.now() - startTime;
               for (let i = 0; i < this.arr.length; i++) {
                  animation.push({
                     ids: [this.arr.length - i - 1],
                     vals: [this.arr[this.arr.length - i - 1]],
                     bgs: ['ready']
                  });
               }
               return animation;
            }
         },
         {
            name: "Quick Sort",
            func: function () {
               let quickSort = function (low, high, animation, vm) {
                  if (low < high) {
                     let pi = partition(low, high, animation, vm);
                     quickSort(low, pi - 1, animation, vm);
                     quickSort(pi + 1, high, animation, vm);
                  }
               }
               let partition = function (low, high, animation, vm) {
                  let pivot = vm.arr[high];
                  let j = low - 1;
                  animation.push({
                     ids: [high],
                     vals: [pivot],
                     bgs: ['compare']
                  });
                  for (let i = low; i <= high - 1; i++) {
                     vm.comparison++;
                     animation.push({
                        ids: [i],
                        vals: [vm.arr[i]],
                        bgs: ['compare']
                     });
                     if (vm.arr[i] < pivot) {
                        j++;
                        let temp = vm.arr[i];
                        vm.arr[i] = vm.arr[j];
                        vm.arr[j] = temp;
                        animation.push({
                           ids: [i, j],
                           vals: [vm.arr[i], vm.arr[j]],
                           bgs: ['swap', 'swap']
                        });
                        animation.push({
                           ids: [i, j],
                           vals: [vm.arr[i], vm.arr[j]],
                           bgs: ['static', 'static']
                        });
                     }
                     animation.push({
                        ids: [i],
                        vals: [vm.arr[i]],
                        bgs: ['static']
                     });
                  }
                  animation.push({
                     ids: [j + 1, high],
                     vals: [vm.arr[j + 1], vm.arr[high]],
                     bgs: ['swap', 'swap']
                  });
                  let temp = vm.arr[j + 1];
                  vm.arr[j + 1] = vm.arr[high];
                  vm.arr[high] = temp;
                  animation.push({
                     ids: [j + 1, high],
                     vals: [vm.arr[j + 1], vm.arr[high]],
                     bgs: ['static', 'static']
                  });
                  return j + 1;
               }
               let animation = [];
               const startTime = Date.now();
               quickSort(0, this.arr.length - 1, animation, this);
               this.time = Date.now() - startTime;
               for (let i = 0; i < this.arr.length; i++) {
                  animation.push({
                     ids: [this.arr.length - i - 1],
                     vals: [this.arr[this.arr.length - i - 1]],
                     bgs: ['ready']
                  });
               }
               return animation;
            }
         },
         {
            name: "Heap Sort",
            func: function () {
               let heapify = function (n, i, animation, vm) {
                  let largest = i;
                  let l = 2 * i + 1;
                  let r = 2 * i + 2;

                  animation.push({
                     ids: [l, largest],
                     vals: [vm.arr[l], vm.arr[largest]],
                     bgs: ['compare', 'compare']
                  });
                  vm.comparison++;
                  if (l < n && vm.arr[l] > vm.arr[largest]) {
                     largest = l;
                  }
                  animation.push({
                     ids: [l, largest],
                     vals: [vm.arr[l], vm.arr[largest]],
                     bgs: ['static', 'static']
                  });

                  animation.push({
                     ids: [r, largest],
                     vals: [vm.arr[r], vm.arr[largest]],
                     bgs: ['compare', 'compare']
                  });
                  vm.comparison++;
                  if (r < n && vm.arr[r] > vm.arr[largest]) {
                     largest = r;
                  }
                  animation.push({
                     ids: [r, largest],
                     vals: [vm.arr[r], vm.arr[largest]],
                     bgs: ['static', 'static']
                  });

                  if (largest != i) {
                     animation.push({
                        ids: [i, largest],
                        vals: [vm.arr[i], vm.arr[largest]],
                        bgs: ['swap', 'swap']
                     });
                     let temp = vm.arr[i];
                     vm.arr[i] = vm.arr[largest];
                     vm.arr[largest] = temp;
                     animation.push({
                        ids: [i, largest],
                        vals: [vm.arr[i], vm.arr[largest]],
                        bgs: ['static', 'static']
                     });
                     heapify(n, largest, animation, vm);
                  }
               }
               let heapSort = function (n, animation, vm) {
                  for (let i = Math.floor(n / 2) - 1; i >= 0; i--)
                     heapify(n, i, animation, vm);
                  for (let i = n - 1; i > 0; i--) {
                     animation.push({
                        ids: [0, i],
                        vals: [vm.arr[0], vm.arr[i]],
                        bgs: ['swap', 'swap']
                     });

                     let temp = vm.arr[0];
                     vm.arr[0] = vm.arr[i];
                     vm.arr[i] = temp;
                     animation.push({
                        ids: [0, i],
                        vals: [vm.arr[0], vm.arr[i]],
                        bgs: ['static', 'static']
                     });

                     heapify(i, 0, animation, vm);
                  }
               }

               let animation = [];
               const startTime = Date.now();
               heapSort(this.arr.length, animation, this);
               this.time = Date.now() - startTime;
               for (let i = 0; i < this.arr.length; i++) {
                  animation.push({
                     ids: [this.arr.length - i - 1],
                     vals: [this.arr[this.arr.length - i - 1]],
                     bgs: ['ready']
                  });
               }
               return animation;
            }
         },
         {
            name: "Bubble Sort",
            func: function () {
               let animation = [];
               const startTime = Date.now();
               let len = this.arr.length;
               let swapped;

               for (var i = 0; i < len; i++) {
                  swapped = false;
                  for (var j = 0; j < len - i - 1; j++) {
                     this.comparison++;
                     animation.push({
                        ids: [j, j + 1],
                        vals: [this.arr[j], this.arr[j + 1]],
                        bgs: ['compare', 'compare']
                     });
                     if (this.arr[j] > this.arr[j + 1]) {

                        animation.push({
                           ids: [j, j + 1],
                           vals: [this.arr[j], this.arr[j + 1]],
                           bgs: ['swap', 'swap']
                        });

                        var temp = this.arr[j];
                        this.arr[j] = this.arr[j + 1];
                        this.arr[j + 1] = temp;
                        swapped = true;
                     }
                     animation.push({
                        ids: [j, j + 1],
                        vals: [this.arr[j], this.arr[j + 1]],
                        bgs: ['static', 'static']
                     });
                  }
                  animation.push({
                     ids: [len - i - 1],
                     vals: [this.arr[len - i - 1]],
                     bgs: ['ready']
                  });
                  if (!swapped) break;
               }
               for (; i < len; i++) {
                  animation.push({
                     ids: [len - i - 1],
                     vals: [this.arr[len - i - 1]],
                     bgs: ['ready']
                  });
               }

               this.time = Date.now() - startTime;
               return animation;
            }
         },
         {
            name: "Fastest",
            func: function () {
            }
         }
      ],
      currentAlgorithmName: '',
      arr: [],
      state: [],
      size: 5,
      comparison: 0,
      time: 0,
      paused: false,
      reverseClicked: false,
      sorted: false,
   },
   computed: {
      blocked: function () {
         return this.currentAlgorithmName === '';
      },
      currentAlgorithmFunc: function () {
         if (this.currentAlgorithmName == "Fastest") {
            this.currentAlgorithmName = "Quick Sort";
            if (this.reverseClicked)
               this.currentAlgorithmName = "Merge Sort";
            if (this.sorted)
               this.currentAlgorithmName = "Bubble Sort";
         }

         return this.algorithms.find((element, index, array) => {
            return this.currentAlgorithmName === element.name;
         }).func;
      },
      elemWidth: function () {
         return 70 / this.size + "%";
      },
      textVisible: function () {
         return this.size <= 25;
      },
      maxVal: function () {
         return Math.max(...this.arr);
      },
      animSpeed: function () {
         return (100 / this.size) * (100 / this.size);
      }
   },
   methods: {
      getRandomInt: function (min, max) {
         min = Math.ceil(min);
         max = Math.floor(max);
         return Math.floor(Math.random() * (max - min + 1)) + min;
      },
      generateArr: function () {
         this.sorted = false;
         this.reverseClicked = false;
         this.arr = [];
         for (let i = 0; i < this.size; i++) {
            this.arr.push(this.getRandomInt(1, this.size * 4));
         }
      },
      reverseSorted: function () {
         this.reverseClicked = true;
         this.sorted = false;
         this.arr.sort((a, b) => a - b).reverse();
      },
      stateInit: function () {
         this.state = [];
         for (let i = 0; i < this.size; i++) {
            this.state.push({
               id: i,
               val: this.arr[i],
               bg: 'static'
            });
         }
      },
      shuffle: function () {
         this.sorted = false;
         this.reverseClicked = false;
         this.arr.sort(() => Math.random() - 0.5);
      },
      elemHeight: function (val) {
         return val / this.maxVal * 100 + "%";
      },
      sort: function () {
         this.animation = [];
         this.time = 0;
         this.comparison = 0;
         this.paused = true;
         this.stateInit();
         let animation = this.currentAlgorithmFunc();
         this.sorted = true;
         this.animate(animation);
         setTimeout(() => {
            this.paused = false;
         }, animation.length * this.animSpeed);
      },
      animate: function (animation) {
         for (let i = 0; i < animation.length; i++) {
            setTimeout(() => {
               for (let j = 0; j < animation[i].ids.length; j++) {
                  this.state[animation[i].ids[j]].val = animation[i].vals[j];
                  this.state[animation[i].ids[j]].bg = animation[i].bgs[j];
               }
            }, this.animSpeed * i);
         }
      }
   },
   created: function () {
      this.generateArr();
   },
   watch: {
      size: function (newValue, oldValue) {
         this.size = +this.size;
         this.generateArr();
      },
      arr: function (newValue, oldValue) {
         this.stateInit();
      }
   }
});