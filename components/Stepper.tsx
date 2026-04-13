"use client";

import React, {
  Children,
  HTMLAttributes,
  ReactNode,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, Variants } from "motion/react";
import { useDirection } from "@/components/ui/direction";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface StepperProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  initialStep?: number;
  onStepChange?: (step: number) => void;
  onFinalStepCompleted?: () => void;
  stepCircleContainerClassName?: string;
  stepContainerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  backButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  nextButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  completeButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  backButtonText?: string;
  nextButtonText?: string;
  completeButtonText?: string;
  disableStepIndicators?: boolean;
  renderStepIndicator?: (props: {
    step: number;
    currentStep: number;
    onStepClick: (clicked: number) => void;
  }) => ReactNode;
}

export default function Stepper({
  children,
  initialStep = 1,
  onStepChange = () => {},
  onFinalStepCompleted = () => {},
  stepCircleContainerClassName = "",
  stepContainerClassName = "",
  contentClassName = "",
  footerClassName = "",
  backButtonProps = {},
  nextButtonProps = {},
  completeButtonProps = {},
  backButtonText = "Back",
  nextButtonText = "Continue",
  completeButtonText = "Complete",
  disableStepIndicators = false,
  renderStepIndicator,
  ...rest
}: StepperProps) {
  const dir = useDirection();
  const isRtl = dir === "rtl";
  const [currentStep, setCurrentStep] = useState<number>(initialStep);
  const [direction, setDirection] = useState<number>(0);
  const [activeStepElement, setActiveStepElement] = useState<HTMLDivElement | null>(
    null
  );
  const stepsArray = Children.toArray(children);
  const totalSteps = stepsArray.length;
  const isCompleted = currentStep > totalSteps;
  const isLastStep = currentStep === totalSteps;

  const { className: backButtonClassName, ...backButtonRest } = backButtonProps;
  const { className: nextButtonClassName, ...nextButtonRest } = nextButtonProps;
  const { className: completeButtonClassName, ...completeButtonRest } =
    completeButtonProps;

  const updateStep = (newStep: number) => {
    setCurrentStep(newStep);
    if (newStep > totalSteps) {
      onFinalStepCompleted();
    } else {
      onStepChange(newStep);
    }
  };

  const validateCurrentStep = useCallback(() => {
    if (!activeStepElement) return true;

    const fields = Array.from(
      activeStepElement.querySelectorAll<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >("input, select, textarea")
    ).filter((field) => !field.disabled && field.type !== "hidden");

    for (const field of fields) {
      if (!field.checkValidity()) {
        field.reportValidity();
        field.focus();
        return false;
      }
    }

    return true;
  }, [activeStepElement]);

  const goToStep = (clicked: number) => {
    if (clicked > currentStep && !validateCurrentStep()) return;
    setDirection(clicked > currentStep ? 1 : -1);
    updateStep(clicked);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      updateStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (!isLastStep && validateCurrentStep()) {
      setDirection(1);
      updateStep(currentStep + 1);
    }
  };

  const handleComplete = () => {
    if (!validateCurrentStep()) return;
    setDirection(1);
    updateStep(totalSteps + 1);
  };

  return (
    <div className="w-full" {...rest}>
      <Card
        className={cn(
          "mx-auto w-full rounded-[2rem] border-border/60 bg-background/70 shadow-sm lg:rounded-none lg:border-0 lg:bg-transparent lg:shadow-none",
          stepCircleContainerClassName
        )}
      >
        <CardContent className={cn("px-3 pt-3 md:px-4 md:pt-4 lg:px-2 lg:pt-2", contentClassName)}>
          <div className="overflow-x-auto pb-1">
            <div
              className={cn(
                "flex min-w-max items-center gap-1 min-[420px]:gap-0",
                isRtl && "flex-row-reverse",
                stepContainerClassName
              )}
            >
              {stepsArray.map((_, index) => {
                const stepNumber = index + 1;
                const isNotLastStep = index < totalSteps - 1;

                return (
                  <React.Fragment key={stepNumber}>
                    {renderStepIndicator ? (
                      renderStepIndicator({
                        step: stepNumber,
                        currentStep,
                        onStepClick: goToStep,
                      })
                    ) : (
                      <StepIndicator
                        step={stepNumber}
                        currentStep={currentStep}
                        disableStepIndicators={disableStepIndicators}
                        onClickStep={goToStep}
                      />
                    )}
                    {isNotLastStep && <StepConnector isComplete={currentStep > stepNumber} />}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          <StepContentWrapper
            isCompleted={isCompleted}
            currentStep={currentStep}
            direction={direction}
            setActiveStepRef={setActiveStepElement}
            className="space-y-2 pt-4"
          >
            {stepsArray[currentStep - 1]}
          </StepContentWrapper>
        </CardContent>

        {!isCompleted && (
          <CardFooter
            className={cn(
              "justify-end px-4 py-3 md:px-4 lg:px-3 lg:py-2",
              "lg:border-t-0 lg:bg-transparent",
              isRtl && "flex-row-reverse",
              footerClassName
            )}
          >
            <div
              className={cn(
                "flex w-full items-center gap-2 max-[420px]:flex-col-reverse",
                isRtl && "flex-row-reverse",
                currentStep !== 1 ? "justify-between" : "justify-end"
              )}
            >
              {currentStep !== 1 && (
                <Button
                  type={backButtonProps.type ?? "button"}
                  variant="ghost"
                  size="lg"
                  onClick={handleBack}
                  className={cn("h-10 rounded-full px-3 text-sm max-[420px]:w-full lg:h-9 lg:text-xs", backButtonClassName)}
                  {...backButtonRest}
                >
                  {backButtonText}
                </Button>
              )}

              {isLastStep ? (
                <Button
                  type={completeButtonProps.type ?? "button"}
                  size="lg"
                  onClick={
                    completeButtonProps.type === "submit"
                      ? completeButtonProps.onClick
                      : handleComplete
                  }
                  className={cn(
                    "h-11 rounded-full bg-gradient-to-r from-primary to-accent px-5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/15 hover:shadow-xl hover:shadow-primary/25 max-[420px]:w-full lg:h-10 lg:px-4 lg:text-xs",
                    completeButtonClassName
                  )}
                  {...completeButtonRest}
                >
                  {completeButtonText}
                </Button>
              ) : (
                <Button
                  type={nextButtonProps.type ?? "button"}
                  size="lg"
                  onClick={handleNext}
                  className={cn(
                    "h-11 rounded-full bg-gradient-to-r from-primary to-accent px-5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/15 hover:shadow-xl hover:shadow-primary/25 max-[420px]:w-full lg:h-10 lg:px-4 lg:text-xs",
                    nextButtonClassName
                  )}
                  {...nextButtonRest}
                >
                  {nextButtonText}
                </Button>
              )}
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}

interface StepContentWrapperProps {
  isCompleted: boolean;
  currentStep: number;
  direction: number;
  children: ReactNode;
  setActiveStepRef: (node: HTMLDivElement | null) => void;
  className?: string;
}

function StepContentWrapper({
  isCompleted,
  currentStep,
  direction,
  children,
  setActiveStepRef,
  className = "",
}: StepContentWrapperProps) {
  const [parentHeight, setParentHeight] = useState<number>(0);

  return (
    <motion.div
      style={{ position: "relative", overflow: "hidden" }}
      animate={{ height: isCompleted ? 0 : parentHeight }}
      transition={{ type: "spring", duration: 0.4 }}
      className={className}
    >
      <AnimatePresence initial={false} mode="wait" custom={direction}>
        {!isCompleted && (
          <SlideTransition
            key={currentStep}
            direction={direction}
            setActiveStepRef={setActiveStepRef}
            onHeightReady={(height) => setParentHeight(height)}
          >
            {children}
          </SlideTransition>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface SlideTransitionProps {
  children: ReactNode;
  direction: number;
  setActiveStepRef: (node: HTMLDivElement | null) => void;
  onHeightReady: (height: number) => void;
}

function SlideTransition({
  children,
  direction,
  setActiveStepRef,
  onHeightReady,
}: SlideTransitionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (containerRef.current) {
      onHeightReady(containerRef.current.offsetHeight);
      setActiveStepRef(containerRef.current);
    }
  }, [children, onHeightReady, setActiveStepRef]);

  return (
    <motion.div
      ref={containerRef}
      custom={direction}
      variants={stepVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.4 }}
      style={{ position: "relative" }}
    >
      {children}
    </motion.div>
  );
}

const stepVariants: Variants = {
  enter: (dir: number) => ({
    x: dir >= 0 ? "-100%" : "100%",
    opacity: 0,
  }),
  center: {
    x: "0%",
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir >= 0 ? "50%" : "-50%",
    opacity: 0,
  }),
};

interface StepProps {
  children: ReactNode;
}

export function Step({ children }: StepProps) {
  return <div>{children}</div>;
}

interface StepIndicatorProps {
  step: number;
  currentStep: number;
  onClickStep: (clicked: number) => void;
  disableStepIndicators?: boolean;
}

function StepIndicator({
  step,
  currentStep,
  onClickStep,
  disableStepIndicators = false,
}: StepIndicatorProps) {
  const status =
    currentStep === step ? "active" : currentStep < step ? "inactive" : "complete";

  const handleClick = () => {
    if (step !== currentStep && !disableStepIndicators) {
      onClickStep(step);
    }
  };

  return (
    <motion.div
      onClick={handleClick}
      className="relative cursor-pointer outline-none focus:outline-none"
      animate={status}
      initial={false}
    >
      <motion.div
        variants={{
          inactive: {
            scale: 1,
            backgroundColor: "var(--color-muted)",
            color: "var(--color-muted-foreground)",
          },
          active: {
            scale: 1,
            backgroundColor: "var(--color-primary)",
            color: "var(--color-primary)",
          },
          complete: {
            scale: 1,
            backgroundColor: "var(--color-accent)",
            color: "var(--color-primary-foreground)",
          },
        }}
        transition={{ duration: 0.3 }}
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border/60 font-semibold shadow-xs min-[420px]:h-8 min-[420px]:w-8 lg:h-7 lg:w-7"
      >
        {status === "complete" ? (
          <CheckIcon className="h-4 w-4 text-primary-foreground" />
        ) : status === "active" ? (
          <div className="h-2.5 w-2.5 rounded-full bg-background" />
        ) : (
          <span className="text-xs">{step}</span>
        )}
      </motion.div>
    </motion.div>
  );
}

interface StepConnectorProps {
  isComplete: boolean;
}

function StepConnector({ isComplete }: StepConnectorProps) {
  const lineVariants: Variants = {
    incomplete: { width: 0, backgroundColor: "transparent" },
    complete: { width: "100%", backgroundColor: "var(--color-primary)" },
  };

  return (
    <div className="relative mx-1 flex-1 overflow-hidden min-[420px]:mx-2">
      <Separator className="absolute inset-x-0 top-1/2 -translate-y-1/2 bg-border/80" />
      <motion.div
        className="absolute left-0 top-1/2 h-px -translate-y-1/2"
        variants={lineVariants}
        initial={false}
        animate={isComplete ? "complete" : "incomplete"}
        transition={{ duration: 0.4 }}
      />
    </div>
  );
}

type CheckIconProps = React.SVGProps<SVGSVGElement>;

function CheckIcon(props: CheckIconProps) {
  return (
    <svg {...props} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          delay: 0.1,
          type: "tween",
          ease: "easeOut",
          duration: 0.3,
        }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}
