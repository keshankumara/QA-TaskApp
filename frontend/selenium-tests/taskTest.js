import { Builder, By, until } from "selenium-webdriver";

(async function taskTest() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // 1️⃣ Open the Task Add page
    await driver.get("http://localhost:5173"); // adjust URL if needed

    // 2️⃣ Fill in task title
    const titleInput = await driver.wait(
      until.elementLocated(By.css("input[placeholder='Enter task title']")),
      5000
    );
    await titleInput.sendKeys("Automated Test Task");

    // 3️⃣ Fill in task description
    const descInput = await driver.findElement(
      By.css("textarea[placeholder='Enter task description']")
    );
    await descInput.sendKeys("Task added via Selenium test");

    // 4️⃣ Click Save Task button
    const saveButton = await driver.findElement(By.xpath("//button[text()='Save Task']"));
    await saveButton.click();

    // 5️⃣ Wait until redirected to /tasks page
    await driver.wait(until.urlContains("/tasks"), 5000);

    console.log("✅ TaskAddPage Selenium test passed!");
  } catch (error) {
    console.error("❌ TaskAddPage Selenium test failed:", error);
  } finally {
    await driver.quit();
  }
})();
