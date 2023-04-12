export default {
    increment (state) {
      // state.counter++;
      state.counter =state.counter +  Math.floor(Math.random() * 10) + 1;
      if(state.counter>999){
        state.counter = 999;
      }
    },
    // changeback_on(state){
    //   state.activeBack = true;
    // },
    // changeback_off(state){
    //   state.activeBack = false;
    // },
    showcard_on(state){
      state.showCard = true;
    },
    showcard_off(state){
      state.showCard = false;
    },
    bodyscroll_off(state){
      state.bodyScrollHide = true;
    },
    bodyscroll_on(state){
      state.bodyScrollHide = false;
    },
    showhead_off(state){
      state.showHead = false;
    },
    showhead_on(state){
      state.showHead = true;
    },
    addratetime(state){
      state.rateTime = state.rateTime+1;
    }
  }