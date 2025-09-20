import { Builder, By, until } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";
import { tmpdir } from "os";
import process from "process";
import { randomUUID } from "crypto";

async function waitForServer(url, timeout = 30000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    try {
      const response = await fetch(url);
      if (response.ok) return true;
    } catch {
      // Server not ready yet
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  throw new Error(`Server at ${url} not ready within ${timeout}ms`);
}

(async function taskTest() {
  // Try different ports for frontend server
  const possibleUrls = [
    "http://localhost:4173", // Vite preview server (CI)
    "http://localhost:5174", // Vite dev server
    "http://localhost:5173"  // Default Vite dev server
  ];
  
  let baseUrl = null;
  for (const url of possibleUrls) {
    try {
      console.log(`Checking server at ${url}...`);
      await waitForServer(url, 5000);
      baseUrl = url;
      console.log(`Found running server at ${baseUrl}`);
      break;
    } catch {
      console.log(`Server not found at ${url}`);
    }
  }

  if (!baseUrl) {
    console.error("❌ No frontend server found. Please start the frontend server first.");
    process.exit(1);
  }

  // Configure Chrome options for CI/headless environment
  const chromeOptions = new chrome.Options();
  
  // Create truly unique user data directory using UUID and process ID
  const uniqueDir = `${tmpdir()}/selenium_${process.pid}_${Date.now()}_${randomUUID()}`;
  console.log(`Using Chrome user data directory: ${uniqueDir}`);
  
  // CI-friendly Chrome options
  chromeOptions.addArguments(
    `--user-data-dir=${uniqueDir}`,
    '--no-sandbox',
    '--disable-dev-shm-usage',
    '--disable-gpu',
    '--disable-web-security',
    '--disable-features=VizDisplayCompositor',
    '--disable-extensions',
    '--no-first-run',
    '--disable-default-apps'
  );
  
  // Add headless mode for CI environments
  if (process.env.CI || process.env.GITHUB_ACTIONS) {
    chromeOptions.addArguments(
      '--headless=new',
      '--window-size=1920,1080'
    );
    console.log("Running in headless mode for CI");
  }

  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(chromeOptions)
    .build();

  try {
    console.log(`Opening browser and navigating to ${baseUrl}...`);
    // 1️⃣ Open the Task Add page
    await driver.get(baseUrl);

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
    process.exit(1);
  } finally {
    console.log("Cleaning up browser session...");
    try {
      await driver.quit();
    } catch (cleanupError) {
      console.warn("Warning: Error during cleanup:", cleanupError.message);
    }
  }
})();
