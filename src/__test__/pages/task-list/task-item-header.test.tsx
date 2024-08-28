import React from "react";
import TaskItemHeader from "@/pages/task-list/task-item-header";
import { render, screen } from "@testing-library/react"
import { ITaskList } from "@/types/task-list";
import "@testing-library/jest-dom"

describe("Task item header", () => {
    it("should be render properly", () => {
        const data: ITaskList = {
            id: "", 
            completed: false,
            taskTitle: "",
            setDate: "2023-08-26",
            description: "",
            chips: [],
        }
        render(<TaskItemHeader data={data} setTaskListData={() => {}} />)
        
        // debugger;
        const taskTitle = screen.getByTestId("task-title")

        expect(taskTitle).toHaveClass("items-center")
    })
})