import React from "react";

/**
 * Polymorphic types. Borrowed from MIT licensed `react-polymorphic-types`.
 *
 * Without carrying its own runtime weight, this collection of types enables `as` props.
 *
 * @see https://www.npmjs.com/package/react-polymorphic-types
 */
export {};

type Merge<T, U> = Omit<T, keyof U> & U;

type PropsWithAs<P, T extends React.ElementType> = P & { as?: T };

export type PolymorphicPropsWithoutRef<P, T extends React.ElementType> = Merge<
  T extends keyof JSX.IntrinsicElements
    ? React.PropsWithoutRef<JSX.IntrinsicElements[T]>
    : React.ComponentPropsWithoutRef<T>,
  PropsWithAs<P, T>
>;

export type PolymorphicPropsWithRef<P, T extends React.ElementType> = Merge<
  T extends keyof JSX.IntrinsicElements
    ? React.PropsWithRef<JSX.IntrinsicElements[T]>
    : React.ComponentPropsWithRef<T>,
  PropsWithAs<P, T>
>;

type PolymorphicExoticComponent<
  P = unknown,
  T extends React.ElementType = React.ElementType
> = Merge<
  React.ExoticComponent<P & { [key: string]: unknown }>,
  {
    /**
     * **NOTE**: Exotic components are not callable.
     */
    <InstanceT extends React.ElementType = T>(
      props: PolymorphicPropsWithRef<P, InstanceT>
    ): React.ReactElement | null;
  }
>;

export type PolymorphicForwardRefExoticComponent<
  P,
  T extends React.ElementType
> = Merge<
  React.ForwardRefExoticComponent<P & { [key: string]: unknown }>,
  PolymorphicExoticComponent<P, T>
>;

export type PolymorphicMemoExoticComponent<
  P,
  T extends React.ElementType
> = Merge<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  React.MemoExoticComponent<React.ComponentType<any>>,
  PolymorphicExoticComponent<P, T>
>;

export type PolymorphicLazyExoticComponent<
  P,
  T extends React.ElementType
> = Merge<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  React.LazyExoticComponent<React.ComponentType<any>>,
  PolymorphicExoticComponent<P, T>
>;
