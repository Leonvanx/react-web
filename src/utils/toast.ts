import toast from 'react-hot-toast';

// eslint-disable-next-line no-undef
declare type Renderable = JSX.Element | string | null;
declare type ValueFunction<TValue, TArg> = (arg: TArg) => TValue;
declare type ValueOrFunction<TValue, TArg> = TValue | ValueFunction<TValue, TArg>;

const darkStyle = {
  borderRadius: '10px',
  background: '#333',
  color: '#fff'
};

const myToast = {
  success: (msg: string, isDark?: boolean) => {
    isDark && toast.success(msg, { style: darkStyle });
    !isDark && toast.success(msg);
  },
  error: (msg: string, isDark?: boolean) => {
    isDark && toast.error(msg, { style: darkStyle });
    !isDark && toast.error(msg);
  },
  promise: <T>(
    promise: Promise<T>,
    msgs: {
      loading: Renderable;
      success: ValueOrFunction<Renderable, T>;
      error: ValueOrFunction<Renderable, any>;
    },
    isDark?: boolean
  ) => {
    isDark && toast.promise(promise, msgs, {});
    !isDark &&
      toast.promise(promise, msgs, {
        style: darkStyle
      });
  }
};
export default myToast;
